import {combineReducers} from 'redux'
import AuthReducer from './AuthReducer'
import ProdukDetail from './produkDetailReducer';


export default combineReducers({
    user : () => 'Theresia Jesa',
    auth :  AuthReducer,
    selectedProduk : ProdukDetail
})