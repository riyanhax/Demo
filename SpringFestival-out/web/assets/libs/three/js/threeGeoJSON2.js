/* Draw GeoJSON

Iterates through the latitude and longitude values, converts the values to XYZ coordinates,
and draws the geoJSON geometries.
创建几何体阵列
得到的转换函数名
创建坐标数组
需要插值
插值点
得到的中点
转换到球坐标
转换为平面坐标
绘制粒子
画线
为每个点创建顶点
清晰的阵列
*/

function drawThreeGeo(json, radius, shape, materalOptions, container) {
    container = container || window.scene;

    var x_values = [];
    var y_values = [];
    var z_values = [];

    //获得json 经纬度json 数据，添加到数组里
    var json_geom = createGeometryArray(json);    //An array to hold the feature geometries.
   //根据传入的shape类型决定是是否要转换为球面坐标或平面坐标
    var convertCoordinates = getConversionFunctionName(shape);   //Whether you want to convert to spherical or planar coordinates.
   //主要保存纹理坐标的数组
   //  纹理坐标是从0到1，它的坐标是x向右，y向下
   //  顶点坐标是从-1到-1，坐标是x向右，y向上
   //  当纹理坐标和顶点坐标的4个点相对应时，纹理图片是原始的位置
    var coordinate_array = [];
    //Re-usable array to hold coordinate values. This is necessary so that you can add 可用于保存坐标值的可重用数组。这是必要的，以便您可以添加
    //interpolated coordinates. Otherwise, lines go through the sphere instead of wrapping around.纹理坐标。否则，直线穿过球体而不是绕绕。

    //遍历原始图形经纬度坐标数组
    for (var geom_num = 0; geom_num < json_geom.length; geom_num++) {

        if (json_geom[geom_num].type == 'Point') {
            convertCoordinates(json_geom[geom_num].coordinates, radius);
            drawParticle(y_values[0], z_values[0], x_values[0], materalOptions);

        } else if (json_geom[geom_num].type == 'MultiPoint') {
            for (var point_num = 0; point_num < json_geom[geom_num].coordinates.length; point_num++) {
                convertCoordinates(json_geom[geom_num].coordinates[point_num], radius);
                drawParticle(y_values[0], z_values[0], x_values[0], materalOptions);
            }

        } else if (json_geom[geom_num].type == 'LineString') {
            coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates);

            for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                convertCoordinates(coordinate_array[point_num], radius);
            }
            drawLine(y_values, z_values, x_values, materalOptions);

        } else if (json_geom[geom_num].type == 'Polygon') {

            for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {

                //赋值给纹理坐标数组
                coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

                for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                    convertCoordinates(coordinate_array[point_num], radius);
                }
                drawLine(y_values, z_values, x_values, materalOptions);
              //  drawShape(x_values, y_values, z_values, materalOptions);
            }

        } else if (json_geom[geom_num].type == 'MultiLineString') {
            for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates.length; segment_num++) {
                coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[segment_num]);

                for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                    convertCoordinates(coordinate_array[point_num], radius);
                }
                drawLine(y_values, z_values, x_values, materalOptions);
            }

        } else if (json_geom[geom_num].type == 'MultiPolygon') {
            for (var polygon_num = 0; polygon_num < json_geom[geom_num].coordinates.length; polygon_num++) {
                for (var segment_num = 0; segment_num < json_geom[geom_num].coordinates[polygon_num].length; segment_num++) {
                    coordinate_array = createCoordinateArray(json_geom[geom_num].coordinates[polygon_num][segment_num]);

                    for (var point_num = 0; point_num < coordinate_array.length; point_num++) {
                        convertCoordinates(coordinate_array[point_num], radius);
                    }
                    drawLine(y_values, z_values, x_values, materalOptions);
                    //drawShape(x_values, y_values, z_values, materalOptions);
                }
            }
        } else {
            throw new Error('The geoJSON is not valid.');
        }
    }

    function createGeometryArray(json) {
        var geometry_array = [];

        if (json.type == 'Feature') {
            geometry_array.push(json.geometry);
        } else if (json.type == 'FeatureCollection') {
            for (var feature_num = 0; feature_num < json.features.length; feature_num++) {
                geometry_array.push(json.features[feature_num].geometry);
            }
        } else if (json.type == 'GeometryCollection') {
            for (var geom_num = 0; geom_num < json.geometries.length; geom_num++) {
                geometry_array.push(json.geometries[geom_num]);
            }
        } else {
            throw new Error('The geoJSON is not valid.');
        }
        //alert(geometry_array.length);
        return geometry_array;
    }

    function getConversionFunctionName(shape) {
        var conversionFunctionName;

        if (shape == 'sphere') {
            conversionFunctionName = convertToSphereCoords;
        } else if (shape == 'plane') {
            conversionFunctionName = convertToPlaneCoords;
        } else {
            throw new Error('The shape that you specified is not valid.');
        }
        return conversionFunctionName;
    }

    function createCoordinateArray(feature) {
        //Loop through the coordinates and figure out if the points need interpolation.通过坐标循环，求出点是否需要插值。
        var temp_array = [];
        var interpolation_array = [];

        for (var point_num = 0; point_num < feature.length; point_num++) {
            var point1 = feature[point_num];
            var point2 = feature[point_num - 1];

            if (point_num > 0) {
                if (needsInterpolation(point2, point1)) {
                    interpolation_array = [point2, point1];
                    interpolation_array = interpolatePoints(interpolation_array);

                    for (var inter_point_num = 0; inter_point_num < interpolation_array.length; inter_point_num++) {
                        temp_array.push(interpolation_array[inter_point_num]);
                    }
                } else {
                    temp_array.push(point1);
                }
            } else {
                temp_array.push(point1);
            }
        }
        return temp_array;
    }

    function needsInterpolation(point2, point1) {
        //If the distance between two latitude and longitude values is
        //greater than five degrees, return true.
        var lon1 = point1[0];
        var lat1 = point1[1];
        var lon2 = point2[0];
        var lat2 = point2[1];
        var lon_distance = Math.abs(lon1 - lon2);
        var lat_distance = Math.abs(lat1 - lat2);

        if (lon_distance > 5 || lat_distance > 5) {
            return true;
        } else {
            return false;
        }
    }

    function interpolatePoints(interpolation_array) {
        //This function is recursive. It will continue to add midpoints to the
        //interpolation array until needsInterpolation() returns false.
        var temp_array = [];
        var point1, point2;

        for (var point_num = 0; point_num < interpolation_array.length - 1; point_num++) {
            point1 = interpolation_array[point_num];
            point2 = interpolation_array[point_num + 1];

            if (needsInterpolation(point2, point1)) {
                temp_array.push(point1);
                temp_array.push(getMidpoint(point1, point2));
            } else {
                temp_array.push(point1);
            }
        }

        temp_array.push(interpolation_array[interpolation_array.length - 1]);

        if (temp_array.length > interpolation_array.length) {
            temp_array = interpolatePoints(temp_array);
        } else {
            return temp_array;
        }
        return temp_array;
    }

    function getMidpoint(point1, point2) {
        var midpoint_lon = (point1[0] + point2[0]) / 2;
        var midpoint_lat = (point1[1] + point2[1]) / 2;
        var midpoint = [midpoint_lon, midpoint_lat];

        return midpoint;
    }

    function convertToSphereCoords(coordinates_array, sphere_radius) {
        var lon = coordinates_array[0];
        var lat = coordinates_array[1];

        x_values.push(Math.cos(lat * Math.PI / 180) * Math.cos(lon * Math.PI / 180) * sphere_radius);
        y_values.push(Math.cos(lat * Math.PI / 180) * Math.sin(lon * Math.PI / 180) * sphere_radius);
        z_values.push(Math.sin(lat * Math.PI / 180) * sphere_radius);
    }

    function convertToPlaneCoords(coordinates_array, radius) {
        var lon = coordinates_array[0];
        var lat = coordinates_array[1];

        z_values.push((lat / 180) * radius);
        y_values.push((lon / 180) * radius);
    }

    function drawParticle(x, y, z, options) {
        var particle_geom = new THREE.Geometry();
        particle_geom.vertices.push(new THREE.Vector3(x, y, z));

        var particle_material = new THREE.ParticleSystemMaterial(options);

        var particle = new THREE.ParticleSystem(particle_geom, particle_material);
        container.add(particle);

        clearArrays();
    }

    function drawLine(x_values, y_values, z_values, options) {
        var line_geom = new THREE.Geometry();
        createVertexForEachPoint(line_geom, x_values, y_values, z_values);

        var line_material = new THREE.LineBasicMaterial(options);
        var line = new THREE.Line(line_geom, line_material);
        container.add(line);

       // clearArrays();
    }


/*    function drawShape(x_values, y_values, z_values,options) {

        var californiaPts = [];
        //  var pointsX,pointsY,pointsZ;
        createVertexForEachPointShape(californiaPts, x_values, y_values,z_values);
       // console.log(californiaPts);

       // for( var i = 0; i < californiaPts.length; i ++ ) californiaPts[ i ].multiplyScalar( 0.25 );
        //参数shape可以传入各种shape画出来的形状
        var californiaShape = new THREE.Shape( californiaPts );

        //配置定义
        var extrudeSettings = { amount: 8, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 1, bevelThickness: 1 };
        //addShape( californiaShape,  extrudeSettings, 0xf08000, -300, -100, 0, 0, 0, 0, 1 );
       // addShape( californiaShape,  extrudeSettings, 0xf08000, -300, -100, 0, 0, 0, 0, 1 );
        addLineShape(californiaShape,californiaPts,0xf08000, 0, 0, 0, 0, 0, 0, 3 );
        clearArrays();
    }

    var loader = new THREE.TextureLoader();
    texture = loader.load( "assets/libs/three/js/UV_Grid_Sm.jpg" );

    // it's necessary to apply these settings in order to correctly display the texture on a shape geometry

    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set( 0.008, 0.008 );

    function addShape( shape,points, extrudeSettings, color, x, y, z, rx, ry, rz, s ) {

        // flat shape with texture
        // note: default UVs generated by ShapeBufferGeometry are simply the x- and y-coordinates of the vertices

        var geometry = new THREE.ShapeBufferGeometry( shape );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { side: THREE.DoubleSide, map: texture } ) );
        mesh.position.set( x, y, z - 175 );
        mesh.rotation.set( rx, ry, rz );
        mesh.scale.set( s, s, s );
        container.add( mesh );

        // flat shape

        var geometry = new THREE.ShapeBufferGeometry( shape );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color, side: THREE.DoubleSide } ) );
        mesh.position.set( x, y, z - 125 );
        mesh.rotation.set( rx, ry, rz );
        mesh.scale.set( s, s, s );
        container.add( mesh );

        // extruded shape

        var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );

        var mesh = new THREE.Mesh( geometry, new THREE.MeshPhongMaterial( { color: color } ) );
        mesh.position.set( x, y, z - 75 );
        mesh.rotation.set( rx, ry, rz );
        mesh.scale.set( s, s, s );
        container.add( mesh );

        addLineShape( shape, color, x, y, z, rx, ry, rz, s );

    }

    function addLineShape( shape,californiaPts,color, x, y, z, rx, ry, rz, s ) {

        // lines

        shape.autoClose = true;

        var points = shape.getPoints();

        var spacedPoints = shape.getSpacedPoints( 50 );

        var geometryPoints = new THREE.BufferGeometry().setFromPoints( points );
        var geometrySpacedPoints = new THREE.BufferGeometry().setFromPoints( spacedPoints );

        // solid line

        var line = new THREE.Line( geometryPoints, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
        line.position.set( x, y, z - 25 );
        line.rotation.set( rx, ry, rz );
        line.scale.set( s, s, s );
        container.add( line );

        // line from equidistance sampled points

        var line = new THREE.Line( geometrySpacedPoints, new THREE.LineBasicMaterial( { color: color, linewidth: 3 } ) );
        line.position.set( x, y, z + 25 );
        line.rotation.set( rx, ry, rz );
        line.scale.set( s, s, s );
        container.add( line );

        // vertices from real points

        var particles = new THREE.Points( geometryPoints, new THREE.PointsMaterial( { color: color, size: 4 } ) );
        particles.position.set( x, y, z + 75 );
        particles.rotation.set( rx, ry, rz );
        particles.scale.set( s, s, s );
        container.add( particles );

        // equidistance sampled points

        var particles = new THREE.Points( geometrySpacedPoints, new THREE.PointsMaterial( { color: color, size: 4 } ) );
        particles.position.set( x, y, z + 125 );
        particles.rotation.set( rx, ry, rz );
        particles.scale.set( s, s, s );
        container.add( particles );


        //扩展线条属于GL_LINES
        // 在绘制直线时，特别是一系列连续的点时，要特别注意 绘线方式GL_LINES 和GL_LINE_STRIP
        // 1、GL_LINES ：每一对顶点被解释为一条直线
        // 2、GL_LINE_STRIP: 一系列的连续直线

    }*/

    function createVertexForEachPointShape(object_geometry, values_axis1, values_axis2,values_axis3) {
        for (var i = 0; i < values_axis1.length; i++) {
            object_geometry.push(new THREE.Vector3(values_axis1[i],values_axis2[i],values_axis3[i]));

        }
    }

    function createVertexForEachPoint(object_geometry, values_axis1, values_axis2, values_axis3) {
        for (var i = 0; i < values_axis1.length; i++) {
            object_geometry.vertices.push(new THREE.Vector3(values_axis1[i],
                values_axis2[i], values_axis3[i]));
        }
    }

    function clearArrays() {
        x_values.length = 0;
        y_values.length = 0;
        z_values.length = 0;
    }
}
