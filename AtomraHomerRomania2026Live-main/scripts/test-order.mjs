
const TEST_ORDER = {
  orderData: {
    orderId: `TEST-ORD-${Math.floor(100000 + Math.random() * 900000)}`,
    customerName: 'Client Teszt (Customer)',
    customerEmail: 'atomrahomeromania@gmail.com', // Using actual address so test emails arrive
    customerPhone: '+40 712 345 678',
    customerAddress: 'Strada Principală Nr. 42, București, România',
    items: [
      {
        name: 'Ceară de Nisip Albă Premium - Box 750g',
        quantity: 2,
        price: '120.00 Lei',
      },
      {
        name: 'Fitile Bumbac 20cm - Set 10 bucăți',
        quantity: 1,
        price: '25.00 Lei',
      },
    ],
    total: 265.0,
    paymentMethod: 'Card Bancar (Stripe Test)',
    orderDate: new Date().toISOString(),
  },
};

async function runTestOrder() {
  console.log('----------------------------------------------------');
  console.log('🚀 ELEMZÉS ÉS TESZT RENDELÉS INDÍTÁSA...');
  console.log(`📋 Rendelés azonosító: ${TEST_ORDER.orderData.orderId}`);
  console.log(`👤 Ügyfél neve: ${TEST_ORDER.orderData.customerName}`);
  console.log(`📧 Ügyfél email: ${TEST_ORDER.orderData.customerEmail}`);
  console.log(`✉️ Admin notification email: atomrahomeromania@gmail.com`);
  console.log('----------------------------------------------------');

  try {
    const response = await fetch('http://127.0.0.1:3000/api/emails', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(TEST_ORDER),
    });

    const result = await response.json();
    console.log('\n📊 TESZT EREDMÉNYEK:');
    console.log('HTTP Status Code:', response.status);
    console.log('Válasz objektum:', JSON.stringify(result, null, 2));

    if (result.success) {
      console.log('\n✅ SIKERES TESZT RENDELÉS ÉS EMAIL KÜLDÉS!');
      console.log(`- Ügyfél email staus: ${result.customerEmailStatus}`);
      console.log(`- Admin email status: ${result.adminEmailStatus}`);
    } else {
      console.log('\n⚠️ EMAIL KÜLDÉS RÉSZBEN VAGY TELJESEN SIKERTELEN:');
      console.log(result.error || result.message);
    }
  } catch (error) {
    console.error('❌ Hiba történt a teszt rendelés során:', error.message);
  }
}

runTestOrder();
