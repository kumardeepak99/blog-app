import { ApiStates } from "./constants/texts/BlogHomeTextConstants";

function Loading() {
  return <h1 className="content-center">{ApiStates.loading}</h1>;
}
export default Loading;
