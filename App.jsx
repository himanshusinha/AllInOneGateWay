import React from 'react';
import {STRIPE_PUBLISH_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';
import PaymentScreen from './src/screens/PaymentScreen';
import {StyleSheet, View} from 'react-native';

const App = () => {
  return (
    <View style={styles.container}>
      <StripeProvider
        publishableKey={STRIPE_PUBLISH_KEY}
        merchantIdentifier="merchant.identifier" // required for Apple Pay
        urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      >
        <PaymentScreen />
      </StripeProvider>
    </View>
  );
};
// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
