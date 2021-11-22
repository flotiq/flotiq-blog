import React from 'react';
import { Pagination } from 'react-bootstrap';
import './Pagination.scss';

const CustomPagination = ({ page, numOfPages }) => (
    <Pagination>
        <Pagination.Prev href={page > 2 ? `/${page - 1}` : '/'} disabled={page === 1} />
        { page > 1 && (
            <>
                <Pagination.Item href="/">{1}</Pagination.Item>
                { page > 5 && <Pagination.Ellipsis />}
            </>
        )}

        { page > 4 && <Pagination.Item href={`/${page - 2}`}>{page - 2}</Pagination.Item>}
        { page > 3 && <Pagination.Item href={`/${page - 1}`}>{page - 1}</Pagination.Item>}
        <Pagination.Item active activeLabel="">{page}</Pagination.Item>
        {page < numOfPages - 1 && <Pagination.Item href={`/${page + 1}`}>{page + 1}</Pagination.Item>}
        {page < numOfPages - 2 && <Pagination.Item href={`/${page + 2}`}>{page + 2}</Pagination.Item>}

        { page < numOfPages && (
            <>
                {page < numOfPages - 3 && <Pagination.Ellipsis />}
                <Pagination.Item href={`/${numOfPages}`}>{numOfPages}</Pagination.Item>
            </>
        )}
        <Pagination.Next href={`/${page + 1}`} disabled={page === numOfPages} />
    </Pagination>
);

export default CustomPagination;
