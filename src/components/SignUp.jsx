import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  useToast,
  HStack,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Icon,
  Text,
} from '@chakra-ui/react'
import {
  AiOutlineUser,
  AiOutlineMail,
  AiOutlineLock,
  AiOutlineWechat,
  AiOutlineQq,
} from 'react-icons/ai'
import { signUp } from '../services/login'

const SignUpSchema = Yup.object().shape({
  username: Yup.string().required('请输入昵称'),
  email: Yup.string().email('请输入正确的邮箱').required('请输入手机号或邮箱'),
  password: Yup.string().min(6, '密码至少6位!').required('请输入密码'),
})

function SignUp() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  return (
    <Formik
      initialValues={{ username: '', email: '', password: '' }}
      validationSchema={SignUpSchema}
      onSubmit={async (values, actions) => {
        setIsSubmitting(true)

        try {
          await signUp(values)
          toast({
            position: 'top',
            title: '注册成功~',
            status: 'success',
            duration: 3000,
          })
        } catch (err) {
          toast({
            position: 'top',
            title: '注册失败~',
            status: 'error',
            duration: 3000,
          })
        } finally {
          setIsSubmitting(false)
        }
      }}
    >
      <Form>
        <Box w="300px">
          <Field name="username">
            {({ field, form, meta }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineUser} color="gray.400" />}
                />
                <Input placeholder="您的昵称" {...field} borderBottom="0" borderRadius="0" />
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="username">
            {(msg) => (
              <Text fontSize="sm" align="left" color="tomato">
                {msg}
              </Text>
            )}
          </ErrorMessage>
          <Field name="email">
            {({ field, form, meta }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineMail} color="gray.400" />}
                />
                <Input placeholder="手机号或邮箱" {...field} borderBottom="0" borderRadius="0" />
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="email">
            {(msg) => (
              <Text fontSize="sm" align="left" color="tomato">
                {msg}
              </Text>
            )}
          </ErrorMessage>
          <Field name="password">
            {({ field, form, meta }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineLock} color="gray.400" />}
                />
                <Input type="password" placeholder="密码" {...field} borderRadius="0" />
              </InputGroup>
            )}
          </Field>
          <ErrorMessage name="password">
            {(msg) => (
              <Text fontSize="sm" align="left" color="tomato">
                {msg}
              </Text>
            )}
          </ErrorMessage>
        </Box>
        <Button
          colorScheme="green"
          mt="15px"
          w="100%"
          borderRadius="2.5rem"
          type="submit"
          isLoading={isSubmitting}
        >
          注册
        </Button>
        <Box mt="50px">
          <Box mb="15px">社交帐号直接注册</Box>
          <HStack justify="center" spacing="20px">
            <Icon as={AiOutlineWechat} w="28px" h="28px" color="#00bb29" />
            <Icon as={AiOutlineQq} w="28px" h="28px" color="#498ad5" />
          </HStack>
        </Box>
      </Form>
    </Formik>
  )
}

export default React.memo(SignUp)
