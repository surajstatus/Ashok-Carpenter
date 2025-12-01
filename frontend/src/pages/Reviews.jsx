import React from 'react'

const Reviews = () => {
    return (
        <div>
            <div style={{ padding: "40px 20px" }}>
                <h2>Customer Reviews</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
                    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
                        <p>"Excellent craftsmanship and timely delivery!"</p>
                        <strong>- Rahul</strong>
                    </div>
                    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
                        <p>"My new dining table is perfect. Highly recommend."</p>
                        <strong>- Priya</strong>
                    </div>
                    <div style={{ padding: "15px", border: "1px solid #ddd", borderRadius: "5px" }}>
                        <p>"Professional service and beautiful designs."</p>
                        <strong>- Amit</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Reviews
