import { notFound } from "next/navigation";
import shopifyClient from "@/app/utils/shopify";
import { cookies } from "next/headers";
import { GET_ONE_PRODUCT } from "@/app/graphql/getOneProduct";
import { OneProduct } from "@/app/graphql/interfaces/one-product.interface";
import ProductClient from "./product.client";

export default async function ProductPage({
    params,
}: {
    params: Promise<{id: string}>;
}){
      const cookieStore = await cookies();
      const cookieCountry = cookieStore.get("country")?.value;
      const country = cookieCountry && cookieCountry !== "null" ? cookieCountry : "GB";
      const { id } = await params;

      const { data, errors } = await shopifyClient.request(GET_ONE_PRODUCT, {
        variables: {
          handle: id,
          country,
          language: "EN",
        },
      });

      if(errors) {
        notFound();
      }
      const singleProduct = data as OneProduct

      return(
        <div className="bg-white">
            <ProductClient product={singleProduct} />
        </div>
      )

      console.log(data)

}