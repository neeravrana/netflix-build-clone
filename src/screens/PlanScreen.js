import React, { useEffect, useState } from "react";
import db from "../firebase";
import {
  collection,
  getDocs,
  where,
  query,
  doc,
  addDoc,
  onSnapshot,
} from "firebase/firestore";
import "./PlanScreen.css";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";

function PlanScreen({getSubscriptionPlan}) {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const document = getDocs(
      collection(doc(collection(db, "customers"), user.uid), "subscriptions")
    );

    document.then((querySnapshot) => {
      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start:
            subscription.data().current_period_start.seconds,
        });
        getSubscriptionPlan(subscription.data().role)
      });
    });
  }, []);

  useEffect(() => {
    const querySnapshot = getDocs(
      query(collection(db, "products"), where("active", "==", true))
    );
    const products = {};
    querySnapshot.then((response) => {
      response.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data();
        const priceSnap = await getDocs(collection(productDoc.ref, "prices"));

        priceSnap.docs.forEach((price) => {
          products[productDoc.id].prices = {
            priceId: price.id,
            priceData: price.data(),
          };
        });
      });

      setProducts(products);
    });

    // })
  }, []);

  const loadCheckout = async (priceId) => {
    const docRef = await addDoc(
      collection(
        doc(collection(db, "customers"), user.uid),
        "checkout_sessions"
      ),
      {
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      }
    );

    onSnapshot(docRef, async (snap) => {
      const { error, sessionId } = snap.data();

      if (error) {
        alert(`An error occured ${error.message}`);
      }
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51JbJLPSBnjEQc9faX9lAUxxjbjsmTccuzqrUBhvYqgW6KtDLMsgR8pjOByhtjo8wnrGDimR9JtdFqPx7mtZDFwC00007HFUOab"
        );

        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  console.log(subscription);

  return (
    <div className="planScreen">
        <p>{subscription && <p>Renewal date:{" "} {new Date(subscription?.current_period_end*1000).toLocaleDateString()}</p>}</p>
      {Object.entries(products).map(([productId, productData]) => {
        const isCurrentPacakage = productData.name
          ?.toLowerCase()
          .includes(subscription?.role);
        return (
          <div
            key={productId}
            className={`${
              isCurrentPacakage && "planScreen__plan--disabled"
            } planScreen__plan`}
          >
            <div className="planScreen__info">
              <h5>{productData.name}</h5>
              <h6>{productData.description}</h6>
            </div>
            <button
              onClick={() =>
                !isCurrentPacakage && loadCheckout(productData.prices.priceId)
              }
            >
              {isCurrentPacakage ? "Current Package" : "Subscribe"}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default PlanScreen;
