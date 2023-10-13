import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import {STRIPE_PUBLISH_KEY} from '@env';
import {StripeProvider} from '@stripe/stripe-react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
