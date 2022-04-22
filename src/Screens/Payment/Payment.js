import { StripeProvider } from '@stripe/stripe-react-native';
import { StyleSheet} from 'react-native';
import Checkout from '../../Components/Checkout/Checkout';



const Payment=({navigation,route})=> {

    return (
        // pk_test_51KcxxpAev9YOfEHruQ3juQb8WJVfIx5x7tWGIJg422c7FF62ouGXhqv274ubbR1324Nmmsnsq88uUymXERR25PU400sra9OGio
        // pk_test_51KjlexK9SRSsZsTiH5qkLfRl3wpA57BH5AkqCzOZC02ffoYgWgNvokswVstJGn2bWzas7bSpMpQszJQBzoeI4btf00xRntlVJw
        <StripeProvider publishableKey="pk_live_51KjlexK9SRSsZsTiOg6NFEAy2x1jJTWSkPbYGtjIQmuSbQkgdOrcibksCUrf8JgI0mJMm4UhJyNmmluG8jSzxoOI00nPEHzsAB">
            <Checkout user={route.params.user} plan={route.params.plan} amount={route.params.amount}/>
        </StripeProvider>
    );
}
export default Payment;
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
},
});
