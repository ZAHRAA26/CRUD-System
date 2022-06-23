import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div>
      Oops, looks like you are in the middle of nowhere let me guide you{" "}
      <Link to="/">back to home page</Link>
    </div>
  );
};

export default NotFoundPage;
