/**
 * Copyright (C) 2005 - 2014 Jaspersoft Corporation. All rights reserved.
 * http://www.jaspersoft.com.
 *
 * Unless you have purchased  a commercial license agreement from Jaspersoft,
 * the following license terms  apply:
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License  as
 * published by the Free Software Foundation, either version 3 of  the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero  General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public  License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


/**
 * @author: Olesya Bobruyko
 * @version:
 */


define(function(require) {

    var _ = require("underscore"),
        importExportTypesEnum = require("tenantImportExport/export/enum/exportTypesEnum");

    var attributesByType = {},

        events = {
            includeAccessEvents: true,
            includeAuditEvents: true,
            includeMonitoringEvents: true
        },

        themes = {
            skipThemes: true
        },

        serverAssets = {
            includeServerSettings: true
        };

    attributesByType[importExportTypesEnum.ROOT_TENANT] = _.extend({}, events, themes);
    attributesByType[importExportTypesEnum.TENANT] = _.extend({}, themes);
    attributesByType[importExportTypesEnum.SERVER_PRO] = _.extend({}, events, themes, serverAssets);
    attributesByType[importExportTypesEnum.SERVER_CE] = _.extend({}, serverAssets, {
        includeAccessEvents: true
    });

    return function(type) {
        return attributesByType[type];
    }
});
