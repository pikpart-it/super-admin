export const rating = {
  excellent: 'excellent',
  veryGood: 'veryGood',
  good: 'good',
  average: 'average',
  poor: 'poor',
}

export const langs = {
  eng: 'eng',
  hin: 'hin',
}

export const ratingList = [
  { name: rating.excellent, label: 'Excellent', value: 5 },
  { name: rating.veryGood, label: 'Very Good', value: 4 },
  { name: rating.good, label: 'Good', value: 3 },
  { name: rating.average, label: 'Average', value: 2 },
  { name: rating.poor, label: 'Poor', value: 1 },
]

export const feedbackQues = [
  {
    eng: 'How was your experience with us?',
    hin: `आपका अनुभव हमारे साथ कैसा रहा?`,
    type: 'radio',
    id: 1,
  },
  // {
  //   eng: 'Are you satisfied with the time spent in servicing your bike',
  //   hin: `क्या आपकी बाइक की सर्विस में लगे समय से आप संतुष्ट है`,
  //   type: 'radio',
  //   id: 2
  // },
  // { eng: 'How did you like our employees', hin: `आपको हमारे कर्मचारीओ का वेहवार केसा लगा`, type: 'radio', id: 3 },
  // {
  //   eng: 'How did you like the atmosphere in the smart garage',
  //   hin: `आपको स्मार्ट गेराज का वातावरण कैसा लगा`,
  //   type: 'radio',
  //   id: 4
  // },
  // {
  //   eng: 'How do you like the service charge of Smart Garage',
  //   hin: `आपको स्मार्ट गेराज के सर्विस चार्ज कैसे लगे`,
  //   type: 'radio',
  //   id: 5
  // },
  // {
  //   eng: 'Which service did you like Smart Garage',
  //   hin: `आपको स्मार्ट गेराज की कोनसी सर्विस अच्छी लगी`,
  //   type: 'dropdown',
  //   id: 6
  // },
  // {
  //   eng: 'What do you want to change in the smart garage service',
  //   hin: `आप स्मार्ट गेराज की कोनसी सर्विस में बदलाव चाहते है`,
  //   type: 'dropdown',
  //   id: 7
  // },
  // {
  //   eng: 'Do you want a reminder of bike service',
  //   hin: `क्या आप बाइक सर्विस का रिमाइंडर चाहते है`,
  //   type: 'radio',
  //   id: 8
  // }
]
