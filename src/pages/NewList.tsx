import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Navigation } from '../components/Navigation';
import { useList } from '../context/ListContext';
import { ShoppingBag } from 'lucide-react';

const NewList = () => {
  const { createList } = useList();
  const navigate = useNavigate();
  
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Montserrat:wght@700;800&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required('List name is required'),
    budget: Yup.number()
      .required('Budget is required')
      .positive('Budget must be a positive number')
      .typeError('Budget must be a number'),
    description: Yup.string(),
  });

  const handleSubmit = (values: { name: string; budget: string | number }) => {
    const budget = typeof values.budget === 'string' ? parseFloat(values.budget) : values.budget;
    createList(values.name, budget);
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <ShoppingBag className="text-blue-600" size={28} />
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Montserrat', sans-serif" }}>
              Create New Shopping List
            </h1>
          </div>
          
          <div className="bg-white/90 backdrop-blur-md rounded-xl shadow-md p-6 border border-white/50">
            <Formik
              initialValues={{ name: '', budget: '', description: '' }}
              validationSchema={validationSchema}
              onSubmit={(values) => handleSubmit({ 
                name: values.name, 
                budget: parseFloat(values.budget as unknown as string) 
              })}
            >
              {({ isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                      List Name
                    </label>
                    <Field
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Weekly Groceries"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="budget" className="block text-gray-700 font-medium mb-2">
                      Budget
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-gray-500">₱</span>
                      </div>
                      <Field
                        type="number"
                        name="budget"
                        id="budget"
                        placeholder="100.00"
                        step="0.01"
                        min="0"
                        className="w-full pl-8 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      />
                    </div>
                    <ErrorMessage name="budget" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="description" className="block text-gray-700 font-medium mb-2">
                      Description (Optional)
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      id="description"
                      rows={3}
                      placeholder="Add notes about this shopping list"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => navigate('/dashboard')}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-gradient-primary text-white rounded-lg hover:shadow-md transition flex-1 hover:translate-y-[-1px] active:translate-y-[0px]"
                    >
                      Create List
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewList;
