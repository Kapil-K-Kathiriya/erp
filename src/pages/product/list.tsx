// pages/products.tsx
import { useState } from "react";
import { Table, Button, Modal, Form, Input, Select, message} from "antd";

const { Option } = Select;

const ProductsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: "Laptop",
      category: "Electronics",
      price: 899.99,
      stockQuantity: 50,
    },
    {
      id: 2,
      name: "Smartphone",
      category: "Electronics",
      price: 699.99,
      stockQuantity: 100,
    },
    {
      id: 3,
      name: "Tablet",
      category: "Electronics",
      price: 299.99,
      stockQuantity: 75,
    },
    {
      id: 4,
      name: "Headphones",
      category: "Electronics",
      price: 99.99,
      stockQuantity: 200,
    },
    {
      id: 5,
      name: "Desk",
      category: "Furniture",
      price: 249.99,
      stockQuantity: 30,
    },
    {
      id: 6,
      name: "Chair",
      category: "Furniture",
      price: 149.99,
      stockQuantity: 50,
    },
    {
      id: 7,
      name: "Bookshelf",
      category: "Furniture",
      price: 199.99,
      stockQuantity: 20,
    },
    {
      id: 8,
      name: "TV",
      category: "Electronics",
      price: 1299.99,
      stockQuantity: 10,
    },
    {
      id: 9,
      name: "Printer",
      category: "Electronics",
      price: 199.99,
      stockQuantity: 40,
    },
    {
      id: 10,
      name: "Monitor",
      category: "Electronics",
      price: 399.99,
      stockQuantity: 25,
    },
  ]);

  // State for modal
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Form initial values
  const [form] = Form.useForm();

  // Columns configuration for the table
  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Name", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Price", dataIndex: "price", key: "price" },
    {
      title: "Stock Quantity",
      dataIndex: "stockQuantity",
      key: "stockQuantity",
    },
    {
      title: "Action",
      key: "action",
      render: (text: string, record: Product) => (
        <div>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Button
            onClick={() => handleDelete(record.id)}
            style={{ marginLeft: "8px" }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  // Function to handle edit button click
  const handleEdit = (record: Product) => {
    setSelectedProduct(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  // Function to handle delete button click
  const handleDelete = (productId: number) => {
    setProducts(products.filter((product) => product.id !== productId));
    message.success("Product Deleted successfully");

  };

  // Function to handle modal submit
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        let updatedProducts;
        if (selectedProduct) {
          // Editing existing product
          updatedProducts = products.map((product) => {
            if (product.id === selectedProduct.id) {
              return { ...product, ...values };
            }
            return product;
          });
        } else {
          // Adding new product
          const newProduct = { id: products.length + 1, ...values };
          updatedProducts = [...products, newProduct];
        }
        setProducts(updatedProducts);
        setIsModalVisible(false);
      })
      
      .catch((error) => console.error("Validation failed:", error));
      message.success("Product added successfully");
  };

  // Function to handle modal cancel
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ paddingBottom: "5px", color: "#000" }}>Products</h1>
      <Button
        type="primary"
        onClick={() => {
          form.resetFields();
          setSelectedProduct(null);
          setIsModalVisible(true);
        }}
      >
        Add Product
      </Button>
      <Table
        dataSource={products}
        columns={columns}
        rowKey="id"
        style={{ marginTop: "20px" }}
      />

      {/* Modal for adding/editing product */}
      <Modal
        title={selectedProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please enter product name" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[
              { required: true, message: "Please select product category" },
            ]}
          >
            <Select>
              <Option value="Category 1">Category 1</Option>
              <Option value="Category 2">Category 2</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="price"
            label="Price"
            rules={[{ required: true, message: "Please enter product price" }]}
          >
            <Input type="number" />
          </Form.Item>
          <Form.Item
            name="stockQuantity"
            label="Stock Quantity"
            rules={[{ required: true, message: "Please enter stock quantity" }]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stockQuantity: number;
}

export default ProductsPage;
