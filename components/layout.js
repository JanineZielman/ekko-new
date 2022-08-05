import Footer from '../components/footer';
import Meta from '../components/meta';
import Nav from '../components/nav';

export default function Layout({ children, navigation }) {
  return (
    <>
      <Meta />
      <Nav navigation={navigation}/>
      <main>{children}</main>
      <Footer />
    </>
  );
}
