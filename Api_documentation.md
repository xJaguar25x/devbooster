# Api documentation:

#### GET methods:

`/api/get_boards`

<pre>
{
    "column_ids": ["5dd87b6e0453e1ca59773bcd"],
    "name": "Updated on 2019-11-26 17:16:49.400168",
    "oid": "5dd87b6e0453e1ca59773bce",
    "owner_id": "5dd87b0e0453e1ca59773bc8"
},
{
    "column_ids": ["..."],
    "name": "...",
    "oid": "id_2",
    "owner_id": "..."
}
</pre>
`/api/get_cards`
<pre>
{
    "comment_ids": [
        "5ddd78c3e57334874a550a77"
    ],
    "description": "Updated on 2019-11-29 00:17:49.578199",
    "name": "Test card",
    "oid": "5dd87b6e0453e1ca59773bcc"
},
{
    "comment_ids": [
        "5ddd78c3e57334874a550a77"
    ],
    "description": "...",
    "name": "Test card2",
    "oid": "id_2"
}
</pre>
`/api/get_columns`
<pre>
{
    "card_ids": [
        "5dd87b6e0453e1ca59773bcc"
    ],
    "name": "Test column",
    "oid": "5dd87b6e0453e1ca59773bcd"
},
{
    "card_ids": [
        "5dd87b6e0453e1ca59773bcc"
    ],
    "name": "Test column2",
    "oid": "id_2"
}
</pre>
