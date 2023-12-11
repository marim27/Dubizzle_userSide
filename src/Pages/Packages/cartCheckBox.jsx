import { useDispatch, useSelector } from 'react-redux';
import { deletePackages, setPackages } from '../../store/slices/cartPackage';

const CartCheckBox = ({Package}) => {
 const cardPackages = useSelector((state) => state.Packages.Packages)
const isFavorite = cardPackages.some((pac) => pac._id === Package._id);

const dispatch = useDispatch();

const AddToCart = () => {
    dispatch(setPackages(Package));
  };

  const RemoveFromCart= () => {
    dispatch(deletePackages(Package._id));
  };
//   console.log(cardPackages);
//   console.log(isFavorite);
    return (
        <div>
             <div onClick={!isFavorite ? AddToCart: RemoveFromCart}>
             {isFavorite ?<input type="checkbox" checked />: <input type="checkbox" />}
             </div>
        </div>
    );
}

export default CartCheckBox;
