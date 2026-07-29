"use client"
import { AllProducts } from "./graphql/interfaces/all-products.interface";
import ShippingCountriesDropdown from "./components/currency-selector";
const HomePage = ({products}: {products: AllProducts }) => {

    console.log(products)
    return(
        <div className=""> 
            <ShippingCountriesDropdown />
        </div>
    )
}

export default HomePage;