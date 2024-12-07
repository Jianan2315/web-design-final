import React from 'react';

const Home = () => {
    return (
        <div style={{ padding: 0, margin: 0, textAlign: 'center' }}>
            <iframe
                src="/index1.html" // 引用 public 文件夹中的 HTML 文件
                style={{
                    width: '100%',
                    height: '100vh', // 设置为视口高度
                    border: 'none',
                }}
                title="Home Page"
            ></iframe>
        </div>
    );
};

export default Home;
