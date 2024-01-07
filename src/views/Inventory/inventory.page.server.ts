import { getModels } from "../../api/getModels";

export async function onBeforeRender(pageContext : Object) {
    const response = await getModels;

    const pageProps = { response };

    console.log(pageContext)
    console.log("ssss")
  
    return {
      pageContext: {
        pageProps
      }
    };
  }

  export const passToClient = ["pageProps"]