import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import data from './emotIcon.json'
export default function EmojiSelector() {
    const [filtereData, setfiltereData] = useState([])
    useEffect(() => {
        let groupedEmojies = groupEmojies(data, "group");
        setfiltereData(groupedEmojies)
    }, [])
    function groupEmojies(list, key) {
        return list.reduce(function (r, a) {
            r[a[key]] = r[a[key]] || [];
            r[a[key]].push(a);
            return r;
        }, {});
    };
    const includedColumns = ['name', 'emoji', 'group'];
    const handleSearch = (value) => {
        const lowercasedValue = value.toLowerCase().trim();
        if (lowercasedValue === '') setfiltereData(groupEmojies(data, "group"));
        else {
            const filteredData = data.filter((item) => {
                return Object.keys(item).some((key) =>
                    includedColumns.includes(key)
                        ? item[key].toString().toLowerCase().includes(lowercasedValue)
                        : false
                );
            });
            setfiltereData(groupEmojies(filteredData, "group"))
        }
    }

    return (
        <div className='parent'>
            <div className='styleBox'>
                <h2>Emoji Selector</h2>
                <input type="text" className="searchInput" onChange={(e) => handleSearch(e.target.value)} placeholder="Search" />
                <div className="listItem">
                    {
                        filtereData && Object.entries(filtereData).map(([title, array], index) => (
                            <>
                                <h3>{title}</h3>
                                {array &&
                                    array.map((details, i) => (
                                        <span style={{ paddingInline: '5px' }}>{details.emoji}</span>
                                    ))}
                            </>
                        ))}
                </div>
            </div>
        </div>
    )
}
