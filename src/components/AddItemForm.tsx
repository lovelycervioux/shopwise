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
  const [previewPrice, setPreviewPrice] = useState<number>(initialItem?.price || 0);
  const [previewQuantity, setPreviewQuantity] = useState<number>(initialItem?.quantity || 1);
  
  const budget = currentList?.budget || 0;
  const remaining = budget - totalSpent + (initialItem?.price || 0) * (initialItem?.quantity || 0);
  const wouldExceedBudget = previewTotal !== null && previewTotal > remaining;

  const validationSchema = Yup.object({
    name: Yup.string().required('Item name is required'),
    price: Yup.number()
      .required('Price is required')
      .min(0, 'Price must be a positive number')
      .typeError('Price must be a number'),
    quantity: Yup.number()
      .required('Quantity is required')
      .min(1, 'Quantity must be at least 1')
      .integer('Quantity must be a whole number')
      .typeError('Quantity must be a number'),
    categoryId: Yup.string().required('Category is required'),
  });

  useEffect(() => {
    if (previewPrice && previewQuantity) {
      setPreviewTotal(previewPrice * previewQuantity);
    } else {
      setPreviewTotal(null);
    }
  }, [previewPrice, previewQuantity]);

  const handleSubmit = (values: { 
    name: string; 
    price: string | number; 
    quantity: string | number; 
    categoryId: string 
  }, { resetForm }: { resetForm: () => void }) => {
    const price = typeof values.price === 'string' ? parseFloat(values.price) : values.price;
    const quantity = typeof values.quantity === 'string' ? parseInt(values.quantity) : values.quantity;
    const totalCost = price * quantity;
    
    onSave({
      name: values.name,
      price: price,
      quantity: quantity,
      categoryId: values.categoryId,
      checked: initialItem?.checked || false,
    });

    if (totalCost > remaining) {
      toast.warning(`Item ${initialItem ? 'updated' : 'added'}, but you're now over budget by ₱${(totalCost - remaining).toFixed(2)}`);
    } else {
      toast.success(`Item ${initialItem ? 'updated' : 'added'}! Remaining budget: ₱${(remaining - totalCost).toFixed(2)}`);
    }
    
    resetForm();
    setPreviewTotal(null);
    setPreviewPrice(0);
    setPreviewQuantity(1);
    onCancel();
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      addCategory(newCategory.trim());
      toast.success(`Added category: ${newCategory}`);
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  return (
    <Formik
      initialValues={{ 
        name: initialItem?.name || '', 
        price: initialItem?.price.toString() || '', 
        quantity: initialItem?.quantity.toString() || '1', 
        categoryId: initialItem?.categoryId || '' 
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, setFieldValue }) => (
        <Form>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-1 text-sm">
                Item Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Apple, Milk, Bread, etc."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
              />
              <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="price" className="block text-gray-700 font-medium mb-1 text-sm">
                  Price
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">₱</span>
                  </div>
                  <Field
                    type="number"
                    name="price"
                    id="price"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className="w-full pl-7 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('price', e.target.value);
                      const value = parseFloat(e.target.value);
                      setPreviewPrice(isNaN(value) ? 0 : value);
                    }}
                  />
                </div>
                <ErrorMessage name="price" component="div" className="text-red-500 text-xs mt-1" />
              </div>
              
              <div>
                <label htmlFor="quantity" className="block text-gray-700 font-medium mb-1 text-sm">
                  Quantity
                </label>
                <Field
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="1"
                  min="1"
                  step="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue('quantity', e.target.value);
                    const value = parseInt(e.target.value);
                    setPreviewQuantity(isNaN(value) ? 1 : value);
                  }}
                />
                <ErrorMessage name="quantity" component="div" className="text-red-500 text-xs mt-1" />
              </div>
            </div>
            
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="categoryId" className="block text-gray-700 font-medium text-sm">
                  Category
                </label>
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
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="New category name"
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
                  id="categoryId"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-sm appearance-none bg-white"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>
              )}
              <ErrorMessage name="categoryId" component="div" className="text-red-500 text-xs mt-1" />
            </div>
            
            {previewTotal !== null && (
              <div className={`mt-4 p-3 rounded-lg ${wouldExceedBudget ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-600'} flex items-start gap-2 text-sm`}>
                {wouldExceedBudget ? <CircleAlert size={16} className="mt-0.5" /> : <DollarSign size={16} className="mt-0.5" />}
                <div>
                  <p className="font-medium">
                    Item total: ₱{previewTotal.toFixed(2)}
                  </p>
                  {wouldExceedBudget ? (
                    <p>This will exceed your remaining budget by ₱{(previewTotal - remaining).toFixed(2)}</p>
                  ) : (
                    <p>Budget remaining after adding: ₱{(remaining - previewTotal).toFixed(2)}</p>
                  )}
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
                } text-white rounded-lg transition text-sm hover:translate-y-[-1px] active:translate-y-[0px]`}
              >
                {wouldExceedBudget 
                  ? `${initialItem ? 'Update' : 'Add'} Anyway (Over Budget)` 
                  : `${initialItem ? 'Update' : 'Add to List'}`}
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddItemForm;
