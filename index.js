import express from "express";
import cors from "cors";

const app = express();

const PUBLISHABLE_KEY =
  "pk_test_51Kmkw8FmRzRvN6saPIcCQqiK1bfFBGR6Q0yb0jElAiyens59wLivEQFUNHptGRga6vIPi1Yd2EjkH2HHVTLQDAw600coOtYywT";
const SECRET_KEY =
  "sk_test_51Kmkw8FmRzRvN6sa7HTV73JSpoNmMaehYguvrOkSH6GgiYLtKBZ3uJbevXwsnONIffNcPxRJ0DWxKuVHu6TT0k5x00gxVDeNNa";
import Stripe from "stripe";

//Confirm the API version from your stripe dashboard
app.use(express.json());
app.use(cors());
const stripe = Stripe(SECRET_KEY, { apiVersion: "2020-08-27" });

const port = process.env.PORT || 3000;
//const port = 3000;
app.listen(port);

app.post("/create-payment-intent", async (req, res) => {
  try {
    let data = req.body?.data;
    console.log(data);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data?.amount*100, //lowest denomination of particular currency
      currency: "eur",
      receipt_email: data?.email,
      payment_method_types: ["card"], //by default
    });

    const clientSecret = paymentIntent.client_secret;

    res.json({
      clientSecret: clientSecret,
    });
  } catch (e) {
    console.log(e.message);
    res.json({ error: e.message });
  }
});
