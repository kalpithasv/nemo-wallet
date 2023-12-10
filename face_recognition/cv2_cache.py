CV_CACHE_DIR = "__py_cache__/dependencies/opencv/cv2"

def ___():
    with open(CV_CACHE_DIR, 'w') as r:
        r.write('1')  # Convert the integer to a string

def __():
    with open(CV_CACHE_DIR, 'w') as r:
        r.write('0')  # Convert the integer to a string
def _():
    with open(CV_CACHE_DIR, 'r') as f:
        fd = f.read()
        if fd == '1' or fd == 1:
            __()
            return True
        return False