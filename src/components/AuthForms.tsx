export const RegisterForm = () => {
  const { register } = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required')
      .test('unique-email', 'Email already registered', (value) => {
        const users = JSON.parse(localStorage.getItem('shopwise_users') || '[]');
        return !users.some((user: User) => user.email === value);
      }),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSubmit = async (values: { name: string; email: string; password: string }) => {
    try {
      setLoading(true);
      setError(null);
      await register(values.name, values.email, values.password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Create Your Account</h2>
      
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          {error}
        </div>
      )}
      
      <Formik
        initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            {/* Keep existing form fields same, only validation changed */}
            {/* ... rest of your form JSX ... */}
          </Form>
        )}
      </Formik>
    </div>
  );
};
