import  { useEffect, useState } from 'react'
import {Card, List,Image, Typography, Badge,Rate, Button, message,Spin,Select} from 'antd'
import { getAllProducts, getProductsByCategory } from '../API'
import { addToCart } from '../API'
import { useParams } from 'react-router-dom'

function Products(){
    const [loading, setLoading] = useState(false)
    const param = useParams()
    const [items, setItems] = useState([]);
    const [sortOrder, setSortOrder] = useState('az')
    useEffect(()=>{
        setLoading (true);
      //  getAllProducts().then(res=>{
       (param?.categoryId ? getProductsByCategory(param.categoryId)
       : getAllProducts()
       ).then((res) =>{
            setItems(res.products);
            setLoading(false);
        });
    },[param]);
    const getSortedItems = () => {
        const sortedItems = [...items];
        sortedItems.sort((a, b) => {
          const aLowerCaseTitle = a.title.toLowerCase();
          const bLowerCaseTitle = b.title.toLowerCase();
    
          if (sortOrder === "az") {
            return aLowerCaseTitle > bLowerCaseTitle
              ? 1
              : aLowerCaseTitle === bLowerCaseTitle
              ? 0
              : -1;
          } else if (sortOrder === "za") {
            return aLowerCaseTitle < bLowerCaseTitle
              ? 1
              : aLowerCaseTitle === bLowerCaseTitle
              ? 0
              : -1;
          } else if (sortOrder === "lowHigh") {
            return a.price > b.price ? 1 : a.price === b.price ? 0 : -1;
          } else if (sortOrder === "highLow") {
            return a.price < b.price ? 1 : a.price === b.price ? 0 : -1;
          }
        });
        return sortedItems;
      };

    
    return (<div>
        <div className='productsContainer'>
            <Typography.Text> View Items Sorted By: </Typography.Text>
            <Select
            onChange={(value)=>{
                setSortOrder(value)
            }}
            defaultValue={'az'}
             options={[
                {
                    label:'Alphabetically a-z',
                    value: 'az'
                },
                {
                    label:'Alphabetically z-a',
                    value: 'za'
                },
                {
                    label:'Price Low to High',
                    value: 'Hight'
                },
                {
                    label:'Price hight to low',
                    value: 'highLow'
                }
            ]}></Select>
        </div>
        
        <List
        grid={{column:3}}
            renderItem ={(products,index) =>{
                return( 
                <Badge.Ribbon className="itemCardBadge"text={products.discountPercentage} color="royalblue">
                <Card className='itemCard'
                title= {products.title}
                key={index}
                cover={<Image className='itemCardImage' src={products.thumbnail}></Image>}
                actions={[
                    <Rate allowHalf  value={products.ratin}/>, 
                    <AddToCartButton item={products}/>
                ]}
                >
                    <Card.Meta title={<Typography.Paragraph>
                        Price: ${products.price} {' '}
                        <Typography.Text delete type='danger'>
                            {}${parseFloat(products.price +products.price* products.discountPercentage/100).toFixed(2)} 
                            </Typography.Text>
                        </Typography.Paragraph>}
                        description ={<Typography.Paragraph ellipsis={{rows:3, expandable:true, symbol:'more'}}>
                            {products.description}
                        </Typography.Paragraph>}
                        
></Card.Meta>
                </Card>

                </Badge.Ribbon>
                );
            }} 
            dataSource={getSortedItems()}
            ></List>
    </div>
       );
     }

     function AddToCartButton({item}){
        const [loading, setLoading] = useState(false);
      
        const addProductsToCart=()=>{
            setLoading(true)

            addToCart(item.id).then(res=>{
                message.success(`${item.title} has been added to cart!!`);
                setLoading(false)
            });
        }
        return (<Button 
            type='link' onClick={()=>{
            addProductsToCart();
        }}

        loading={loading}  
        >
            Add to Cart
            </Button>
            );
     }

export default Products