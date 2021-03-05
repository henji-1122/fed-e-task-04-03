import React, { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import {
  Box,
  InputGroup,
  InputLeftElement,
  Input,
  Flex,
  Checkbox,
  Link,
  Button,
  HStack,
  Icon,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  AiOutlineUser,
  AiOutlineLock,
  AiOutlineWeibo,
  AiOutlineWechat,
  AiOutlineQq,
} from 'react-icons/ai'
import { signIn } from '../services/login'

const SignInSchema = Yup.object().shape({
  email: Yup.string().email('请输入正确的邮箱').required('请输入手机号或邮箱'),
  password: Yup.string().min(6, '密码至少6位!').required('请输入密码'),
})

function SignIn() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      validationSchema={SignInSchema}
      onSubmit={async (values, actions) => {
        setIsSubmitting(true)

        try {
          await signIn(values)
          toast({
            position: 'top',
            title: '登录成功~',
            status: 'success',
            duration: 3000,
          })
        } catch (err) {
          toast({
            position: 'top',
            title: '登录失败~',
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
          <Field name="email">
            {({ field, form, meta }) => (
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<Icon as={AiOutlineUser} color="gray.400" />}
                />
                <Input placeholder="手机号或邮箱" {...field} borderBottom="0" borderRadius="0"/>
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
        <Flex justify="space-between" mt="15px" color="gray.600" >
          <Checkbox defaultIsChecked>记住我</Checkbox>
          <Link>登录遇到问题?</Link>
        </Flex>
        <Button
          colorScheme="blue"
          mt="15px"
          w="100%"
          borderRadius="2.5rem"
          type="submit"
          isLoading={isSubmitting}
        >
          登录
        </Button>
        <Box mt="50px" color="gray.600" >
          <Box mb="15px">社交帐号登录</Box>
          <HStack justify="center" spacing="20px">
            <Icon as={AiOutlineWeibo} w="28px" h="28px" color="#e05244" />
            <Icon as={AiOutlineWechat} w="28px" h="28px" color="#00bb29" />
            <Icon as={AiOutlineQq} w="28px" h="28px" color="#498ad5" />
          </HStack>
        </Box>
      </Form>
    </Formik>
  )
}

export default React.memo(SignIn)
