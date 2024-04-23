# Streamlit Iframe Event

streamlit-iframe-event converts window messages in iframes into component return values.

## Install
```
pip install streamlit-iframe-event
```

## Usage
```
 import streamlit as st
event = st_iframe_event("https://example.com", key="test", default_width="400px")
st.write(event)
```
