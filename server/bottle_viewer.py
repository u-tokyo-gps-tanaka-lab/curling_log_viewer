#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
This is a log viewer of digital curling games.

Homepage and documentation: http://github.com/....

Copyright (c) 2016, Tetsuro Tanaka.
License: MIT (see LICENSE for details)
"""

import os
import os.path
from bottle import route, static_file, run, abort, template, redirect
import urllib.request
import sys
import getopt

__author__ = 'Tetsuro Tanaka'
__version__ = '0.1'
__license__ = 'MIT'


base_dir = '.'
log_base = base_dir


@route('/js/<filename:re:.*\.js>')
def js_callback(filename):
    return static_file(filename, './js', mimetype='application/javascript')


def handle_directory(path, fname):
    files = ''
    for s in os.listdir(fname):
        if os.path.isdir(fname + '/' + s):
            files += ('<li> <a href="/viewer/%s/%s">%s/</a>\n' % (path, s, s))
        else:
            files += ('<li> <a href="/viewer/%s/%s">%s</a>\n' % (path, s, s))
    return template('directory', path=path, files=files)


@route('/')
def redirect_viewer():
    redirect('/viewer/')


@route('/viewer/')
@route('/viewer/<path:path>')
def viewer_callback(path=''):
    fname = log_base + '/' + urllib.request.url2pathname(path)
    if len(path) > 1 and path[-1] == '/':
        path = path[0:-1]
    if not os.path.exists(fname):
        print('fname %s' % fname, file=sys.stderr)
        abort(404, 'File does not exists')
    if os.path.isdir(fname):
        return handle_directory(path, fname)
    with open(fname) as f:
        l = ''.join(f.readlines())
        return template('curling_viewer', log=l)


def _main(argv):
    try:
        opt, args = getopt.getopt(argv[1:], 'p:', ['port='])
    except getopt.GetoptError as err:
        print(err, file=sys.stderr)
        sys.exit(2)
    port = 8080
    for o, a in opt:
        if o in ('-p', '--port'):
            port = int(a)
            print("port = %s" % port)
    if len(args) == 1:
        global log_base
        log_base = args[0]
    run(host='localhost', port=port)

if __name__ == '__main__':
    _main(sys.argv)
