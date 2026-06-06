const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://husnainrazaghulamraza_db_user:zrI4rGUZZiydi5Ur@cluster0.hfaunbg.mongodb.net/?appName=Cluster0';

async function testConnection() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected successfully!');
    
    // Test creating a simple schema and document
    const testSchema = new mongoose.Schema({
      name: String,
      email: String,
      createdAt: { type: Date, default: Date.now }
    });
    
    const TestModel = mongoose.model('Test', testSchema);
    
    // Create a test document
    const testDoc = new TestModel({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    await testDoc.save();
    console.log('✅ Test document saved successfully!');
    
    // Find the document
    const found = await TestModel.findOne({ email: 'test@example.com' });
    console.log('✅ Document found:', found);
    
    await mongoose.connection.close();
    console.log('✅ Connection closed');
  } catch (error) {
    console.error('❌ Database error:', error.message);
  }
}

testConnection();
