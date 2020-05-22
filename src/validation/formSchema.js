import * as yup from 'yup'

const formSchema = yup.object().shape({
    name: yup.string()
        .trim()
        .min(2, 'name must be at least 2 charcters long')
})
export default formSchema