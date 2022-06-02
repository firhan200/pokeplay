import Layout from "../../components/Layout";
import UserCard from "../../components/UserCard";
import FeedList from "../../components/FeedList";

const Feeds = () => {
    return(
        <Layout showNavbar={true}>
            <div className="container mt-5">
                <div className="row">
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <UserCard />
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4">
                        <FeedList />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Feeds;