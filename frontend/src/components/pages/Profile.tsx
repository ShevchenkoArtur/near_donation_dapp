import React, {useEffect, useState} from 'react';
import {Post as PostType} from '../../types/post';
import {useParams} from 'react-router-dom';
import Post from '../Post';
import {Box, Typography} from '@mui/material';
import {flexGridStyle} from '../../styles/common';
import NothingYet from '../UI/NothingYet';
import Loading from '../UI/Loading';

const Profile = () => {
    const {id} = useParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [posts, setPosts] = useState<PostType[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const data = await window.contract.findAllPosts();
                setPosts(data.filter(el => el.publisher === id));
                setIsLoading(false);
            } catch (err) {
                console.error(err);
                setIsLoading(false);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {isLoading ?
                <Loading/>
                :
                <>
                    <Box mb={2}>
                        <Typography align='center'>Profile</Typography>
                        <Typography align='center' fontWeight='bold'>{id}</Typography>
                    </Box>
                    <Box sx={flexGridStyle}>
                        {posts.length ?
                            posts.map(el => <Post key={el.id} post={el}/>)
                            :
                            <NothingYet/>
                        }
                    </Box>
                </>
            }
        </>
    );
};

export default Profile;
