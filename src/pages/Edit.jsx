import { Card, Typography } from 'antd';

const { Title } = Typography;

/**
 * 编辑页面组件
 */
const Edit = () => {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <Title level={2}>编辑简历</Title>
        <p>此页面将包含简历编辑表单</p>
      </Card>
    </div>
  );
};

export default Edit;
