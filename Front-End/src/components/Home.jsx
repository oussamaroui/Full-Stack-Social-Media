import Aside from './Aside';
import Nav from './Nav';
import Post from './Post';

const Home = () => {

    return (
        <>
            <Nav />
            <main id='main'>
                <section id='leftMain'>
                    <Aside />
                </section>
                <section id='rightMain'>
                    <Post />
                </section>
            </main>
        </>
    );
};

export default Home;
