import { Card, Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { EditOutlined, FileTextOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

/**
 * 首页组件
 */
const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <Card>
        <Title level={2}>欢迎使用在线简历生成器</Title>
        <Paragraph>
          快速创建专业简历，支持导出PDF格式
        </Paragraph>

        <div style={{ marginTop: 24 }}>
          <Button 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => navigate('/edit')}
            style={{ marginRight: 16 }}
          >
            开始编辑
          </Button>
          <Button 
            icon={<FileTextOutlined />}
            onClick={() => navigate('/preview')}
          >
            预览简历
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Home;
