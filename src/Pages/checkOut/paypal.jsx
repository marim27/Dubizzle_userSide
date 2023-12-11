import { PayPalButtons } from '@paypal/react-paypal-js';
import axiosInstanceProducts from '../../axiosConfig/DubizzleDB';
import { useDispatch } from 'react-redux';
import { deleteAllPackages } from '../../store/slices/cartPackage';
import { useNavigate } from 'react-router';
const Paypal = ({ totalPrice, PackagesIDS ,cardPackages}) => {
    const getUser = JSON.parse(localStorage.getItem("userInfo"))
    // console.log(getUser);
    // console.log(totalPrice);
    // console.log(PackagesIDS);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const createOrder = (data) => {
        console.log(data);
        return axiosInstanceProducts.post("/paypalPayment/create-order", {
            headers: {
                "Content-Type": "application/json",
            },
            cart: {
                price: totalPrice,
            },
        })
            .then((res) => {
                console.log(res);
                return res
            }).then((order) => order.data.id)
            .catch((err) => {
                console.log(err);
            });
    };
    const onApprove = (data, actions) => {
        console.log('DATA',data);
        console.log('ACTIONS',actions);
        dispatch(deleteAllPackages(cardPackages));
        navigate('/boughtpackages')
        return axiosInstanceProducts
            .post(`/paypalPayment/capture-order/${data.orderID}`,
            {redirect_urls: {
                return_url: `http://localhost:5555/success/${data.payerID}/${data.paymentID}`
              },}
          )
            .then((res) => {
                console.log(res);
                axiosInstanceProducts
                    .post("/packageOrders", {
                        packageID: PackagesIDS,
                        userID: getUser._id,
                        amount: totalPrice,
                        transactionID: res.data.id,
                        currency: 'egp',
                        method:data.paymentSource,
                        status: (res.data.status === "COMPLETED") ? "succeeded" : "failed"
                    })
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={(data, actions) => onApprove(data, actions)} />
        </div>
    );
}
export default Paypal;