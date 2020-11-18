import * as yup from 'yup';

export default yup.object().shape({
    nickname: yup.string()
      .required('Your plant needs a name'),
    image:yup.string(),
      // .url('Please provide an image URL') // Research this to only allow an image url
    species:yup.string()
      .required('What is the species?'),
    description:yup.string(),
    datePlanted:yup.string(),
    frequency:yup.string()
      .required('You must choose how often you water this plant'),
    careInstructions:yup.string(),
})