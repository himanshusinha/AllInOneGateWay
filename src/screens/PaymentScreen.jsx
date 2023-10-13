import {View, Text, SafeAreaView, Alert} from 'react-native';
import React, {useState} from 'react';
import {
  CardField,
  confirmPayment,
  createToken,
} from '@stripe/stripe-react-native';
import ButtonComp from '../components/ButtonComp';
import creatPaymentIntent from '../apis/stripeApis';

const PaymentScreen = () => {
  const [cardInfo, setCardInfo] = useState(null);
  const fetchCardDetail = cardDetail => {
    // console.log("my card details",cardDetail)
    if (cardDetail.complete) {
      setCardInfo(cardDetail);
    } else {
      setCardInfo(null);
    }
  };
  const onDone = async () => {
    let apiData = {
      amount: 1900,
      currency: 'INR',
    };

    try {
      const res = await creatPaymentIntent(apiData);
      console.log('payment intent create succesfully...!!!', res);

      if (res?.data?.paymentIntent) {
        let confirmPaymentIntent = await confirmPayment(
          res?.data?.paymentIntent,
          {paymentMethodType: 'Card'},
        );
        console.log('confirmPaymentIntent res++++', confirmPaymentIntent);
        Alert.alert('Payment succesfully...!!!');
      }
    } catch (error) {
      console.log('Error rasied during payment intent', error);
    }

    console.log('cardInfocardInfocardInfo', cardInfo);
    if (!!cardInfo) {
      try {
        const resToken = await createToken({...cardInfo, type: 'Card'});
        console.log('resToken', resToken);
      } catch (error) {
        alert('Error raised during create token');
      }
    }
  };
  return (
    <SafeAreaView>
      <CardField
        postalCodeEnabled={false}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
        }}
        style={{
          width: '100%',
          height: 50,
          marginVertical: 30,
        }}
        onCardChange={cardDetails => {
          fetchCardDetail(cardDetails);
        }}
        onFocus={focusedField => {
          console.log('focusField', focusedField);
        }}
      />

      <ButtonComp onPress={onDone} disabled={!cardInfo} />
    </SafeAreaView>
  );
};

export default PaymentScreen;
