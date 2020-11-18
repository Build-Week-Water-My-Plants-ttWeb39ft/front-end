import * as yup from 'yup';

export default yup.object().shape({
    nickname: yup.string(),
    image:yup.string(),
    species:yup.string(),
    description:yup.string(),
    datePlanted:yup.string(),
    frequency:yup.string(),
    careInstructions:yup.string(),
})