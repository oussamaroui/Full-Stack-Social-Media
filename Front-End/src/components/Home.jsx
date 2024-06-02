import Aside from './Aside';
import Nav from './Nav';
import Post from './Post';
import Story from './Story';

const Home = () => {

    return (
        <>
            <Nav />
            <main id='main'>
                <section id='leftMain'>
                    <Aside />
                </section>
                <section id='centerMain'>
                    <Post />
                </section>
                <section id='rightMain'>
                    <Story />
                </section>
            </main>
        </>
    );
};

export default Home;
