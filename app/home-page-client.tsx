import { AllProducts } from "./graphql/interfaces/all-products.interface";

const HomePage = ({products}: {products: AllProducts }) => {
    console.log(products)
    return(
        <div>

        </div>
    )
}

export default HomePage;