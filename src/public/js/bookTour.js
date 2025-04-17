document.getElementById('submitBtn').addEventListener('click', async function (event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định

    // Lấy thông tin từ form
    const selectedDate = document.getElementById('datepicker').value; // Ngày khởi hành
    const numberOfPeople = document.getElementById('people-count').value; // Số người
    const totalPrice = document.getElementById('total-price').value.replace(/[^0-9]/g, ''); // Xóa ký tự không phải số
    const tourId = "{{tour.tour_id}}"; // Mã tour
    const userId = "{{user.id}}"

    if (!selectedDate) {
        alert("Vui lòng chọn ngày khởi hành!");
        return;
    }
    if (!numberOfPeople) {
        alert("Vui lòng chọn số người!");
        return;
    }
    if (!totalPrice) {
        alert("Vui lòng chọn giá tiền!");
        return;
    }
    if (!tourId) {
        alert("Vui lòng chọn tour !");
        return;
    }
    if (!userId) {
        alert("Vui lòng chọn id!");
        return;
    }

    // Gửi dữ liệu tới server
    try {
        const response = await fetch('/book-tour', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                tourId: tourId,
                userId: userId,
                date: selectedDate,
                people: numberOfPeople,
                total: totalPrice,
            }),
        });

        if (response.ok) {
            const result = await response.json();
            alert(`Đặt tour thành công! Mã đặt chỗ: ${result.bookingId}`);
        } else {
            const error = await response.text();
            alert(`Lỗi khi đặt tour: ${error}`);
        }
    } catch (error) {
        console.error('Lỗi:', error);
        alert('Đã xảy ra lỗi, vui lòng thử lại!');
    }
});
