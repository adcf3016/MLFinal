title = 'My Document'
body = {
    'title': title
}
doc = service.documents() \
    .create(body=body).execute()
print('Created document with title: {0}'.format(
    doc.get('title')))
