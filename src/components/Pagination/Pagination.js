import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.scss';

const CustomPagination = ({ page, numOfPages }) => (
    <Pagination className="mb-5 pb-5">
        <Pagination.Prev href={page > 2 ? `/blog/${page - 1}` : '/blog/'} disabled={page === 1} />
        { page > 1 && (
            <>
                <Pagination.Item href="/blog/">{1}</Pagination.Item>
                { page > 4 && <Pagination.Ellipsis />}
            </>
        )}

        { page > 3 && <Pagination.Item href={`/blog/${page - 2}`}>{page - 2}</Pagination.Item>}
        { page > 2 && <Pagination.Item href={`/blog/${page - 1}`}>{page - 1}</Pagination.Item>}
        <Pagination.Item active activeLabel="">{page}</Pagination.Item>
        {page < numOfPages - 1 && <Pagination.Item href={`/blog/${page + 1}`}>{page + 1}</Pagination.Item>}
        {page < numOfPages - 2 && <Pagination.Item href={`/blog/${page + 2}`}>{page + 2}</Pagination.Item>}

        { page < numOfPages && (
            <>
                {page < numOfPages - 3 && <Pagination.Ellipsis />}
                <Pagination.Item href={`/blog/${numOfPages}`}>{numOfPages}</Pagination.Item>
            </>
        )}
        <Pagination.Next href={`/blog/${page + 1}`} disabled={page === numOfPages} />
    </Pagination>
);

export default CustomPagination;
