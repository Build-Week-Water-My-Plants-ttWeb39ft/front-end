import * as yup from 'yup';

export default yup.object().shape({
    nickname: yup.string()
      .required('Your plant child needs name'),
    image:yup.string(),
    species:yup.string()
      .required('What is the species?'),
    description:yup.string(),
    datePlanted:yup.string(),
    frequency:yup.string()
      .required('You must choose how often you water this plant'),
    careInstructions:yup.string(),
})