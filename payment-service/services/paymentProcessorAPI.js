import axios from 'axios';

const paymentProcessorAPI = {
    verifyPayment: async (studentId) => {
        try {
            const response = await axios.get(`https://api.paymentprocessor.com/payments/${paymentId}/verify`);
            return response.data; // Assuming the response contains a 'status' field
        } catch (error) {
            throw new Error('Failed to verify payment: ' + error.message);
        }
    }
};

export default paymentProcessorAPI;