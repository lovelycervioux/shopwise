import { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useList } from '../context/ListContext';
import { toast } from 'react-toastify';
import { CircleAlert, DollarSign, Plus } from 'lucide-react';
import { GroceryItem } from '../types';

interface AddItemFormProps {
  onCancel: () => void;
  initialItem?: GroceryItem;
  onSave: (item: Omit<GroceryItem, 'id'>) => void;
}

const AddItemForm: React.FC<AddItemFormProps> = ({ onCancel, initialItem, onSave }) => {
  const { categories, addCategory, currentList, totalSpent } = useList();
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [previewTotal, setPreviewTotal] = useState<number | null>(null);
  const [previewPrice, setPreviewPrice] = useState(initialItem?.price || 0);
  const [previewQuantity, setPreviewQuantity] = useState(initialItem?.quantity || 1);

  const budget = currentList?.budget || 0;
  const remaining = budget - totalSpent + (initialItem?.price || 0) * (initialItem?.quantity || 0);
  const wouldExceedBudget = previewTotal !== null && previewTotal > remaining;

  const validationSchema = Yup.object({
    name: Yup.string().required('Item name is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be positive')
      .typeError('Enter a valid number'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Minimum 1')
      .integer('Must be whole number')
      .typeError('Enter a valid number'),
    categoryId: Yup.string().required('Category is required')
  });

  useEffect(() => {
    const total = (previewPrice || 0) * (previewQuantity || 1);
    setPreviewTotal(isNaN(total) ? null : total);
  }, [previewPrice, previewQuantity]);

  const handleSubmit = (values: any, { resetForm }: any) => {
    try {
      onSave({
        name: values.name,
        price: parseFloat(values.price),
        quantity: parseInt(values.quantity),
        categoryId: values.categoryId,
        checked: initialItem?.checked || false
      });
      resetForm();
      onCancel();
    } catch (error) {
      toast.error('Failed to save item');
    }
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  return (
    <Formik
      initialValues={{ 
        name: initialItem?.name || '', 
        price: initialItem?.price?.toString() || '', 
        quantity: initialItem?.quantity?.toString() || '1', 
        categoryId: initialItem?.categoryId || '' 
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">Item Name</label>
              <Field
                name="name"
                placeholder="Apple, Milk, Bread"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Price</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">₱</span>
                  <Field
                    name="price"
                    type="number"
                    step="0.01"
                    className="w-full pl-7 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    onChange={(e: any) => {
                      setFieldValue('price', e.target.value);
                      setPreviewPrice(parseFloat(e.target.value) || 0);
                    }}
                  />
                </div>
                <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1 text-sm">Quantity</label>
                <Field
                  name="quantity"
                  type="number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  onChange={(e: any) => {
                    setFieldValue('quantity', e.target.value);
                    setPreviewQuantity(parseInt(e.target.value) || 1);
                  }}
                />
                <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-gray-700 font-medium text-sm">Category</label>
                {!showNewCategory && (
                  <button
                    type="button"
                    onClick={() => setShowNewCategory(true)}
                    className="text-blue-600 hover:text-blue-700 text-xs flex items-center"
                  >
                    <Plus size={12} className="mr-1" /> Add New
                  </button>
                )}
              </div>

              {showNewCategory ? (
                <div className="flex gap-2">
                  <input
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewCategory(false)}
                    className="px-3 py-2 border border-gray-300 text-gray-600 rounded-lg hover:bg-gray-50 transition text-sm"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <Field
                  as="select"
                  name="categoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                >
                  <option value="">Select category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>{category.name}</option>
                  ))}
                </Field>
              )}
              <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs mt-1" />
            </div>

            {previewTotal !== null && (
              <div className={`p-3 rounded-lg flex gap-2 text-sm ${
                wouldExceedBudget ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'
              }`}>
                {wouldExceedBudget ? <CircleAlert size={16} /> : <DollarSign size={16} />}
                <div>
                  <p className="font-medium">Total: ₱{previewTotal.toFixed(2)}</p>
                  <p>{wouldExceedBudget 
                    ? `Exceeds budget by ₱${(previewTotal - remaining).toFixed(2)}`
                    : `Remaining: ₱${(remaining - previewTotal).toFixed(2)}`}
                  </p>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition text-sm"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-4 py-2 ${
                  wouldExceedBudget 
                    ? 'bg-gradient-warning hover:shadow-md' 
                    : 'bg-gradient-primary hover:shadow-md'
                } text-white rounded-lg transition text-sm`}
              >
                {initialItem ? 'Update Item' : 'Add to List'}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;
