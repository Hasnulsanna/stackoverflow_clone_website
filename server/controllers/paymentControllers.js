import { v4 as uuid } from 'uuid';
import stripePackage from 'stripe';



export const Payment = async (req, res) => {
    const stripe = stripePackage("sk_test_51NOatmSI6GOQ6lgrxCgAbWWujtXAIOLnPVVESsjq4l5385Y6KEsoWHLDAwOqxxzLkpKVVeo0JW5bLkEn1gYWN51Z00GLcfEkdc");
    const {product,token} = req.body;
    console.log("Product",product);
    console.log("Price",product.price);

    const idempotencyKey=uuid()

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.paymentIntents.create({
            amount:product.price * 100,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email,
            description:`purchase of product.name`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }
        },{idempotencyKey})
    })
    .then(result=>res.status(200).json(result))
    .catch(err=>console.log(err))


}