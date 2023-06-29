import Farmer from "../components/Game/Farmer";
import Navbar from "../components/Navbar";

const IndexPage = () => (
  <>
    <div className="h-screen w-screen overflow-hidden">
        <Navbar />
        <div className="h-3/4 w-3/4 mx-auto mt-40 border-8 border-gray-900 rounded-2xl shadow-xl">
            <Farmer />
        </div>
    </div>
  </>
);

export default IndexPage;
